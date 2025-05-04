package main

import (
	"log"
	"net"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/nerfthisdev/kronos-server/internal/cpu"
	pb "github.com/nerfthisdev/kronos-server/proto"
	"google.golang.org/grpc"
)

type monitorServer struct {
	pb.UnimplementedMonitorServiceServer
}

func (s *monitorServer) StreamStats(_ *pb.StatsRequest, stream grpc.ServerStreamingServer[pb.StatsResponse]) error {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			stats, err := cpu.GetCpuStats()

			if err != nil {
				return err
			}
			var cores []*pb.CPUCoreUsage

			keys := make([]string, 0, len(stats.CoresUsage))
			for k := range stats.CoresUsage {
				keys = append(keys, k)
			}
			sort.Slice(keys, func(i, j int) bool {
				numI, _ := strconv.Atoi(strings.TrimPrefix(keys[i], "cpu"))
				numJ, _ := strconv.Atoi(strings.TrimPrefix(keys[j], "cpu"))
				return numI < numJ
			})

			for _, core := range keys {
				usage := stats.CoresUsage[core]
				cores = append(cores, &pb.CPUCoreUsage{
					Core:  core,
					Usage: usage,
				})
			}
			cpuResp := &pb.CPUStatsResponse{
				TotalUsage: stats.TotalUsage,
				Btime:      stats.BTime,
				CoresUsage: cores,
			}

			resp := &pb.StatsResponse{
				CpuUsageTotal: cpuResp,
				MemoryUsage:   0,
				DiskUsage:     0,
			}
			if err := stream.Send(resp); err != nil {
				return err
			}
		}
	}
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	pb.RegisterMonitorServiceServer(grpcServer, &monitorServer{})

	log.Println("gRPC server listening on :50051")

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
