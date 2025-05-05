package main

import (
	"log"
	"net"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/nerfthisdev/kronos-server/internal/cpu"
	"github.com/nerfthisdev/kronos-server/internal/disk"
	"github.com/nerfthisdev/kronos-server/internal/memory"
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
			cpuStats, err := cpu.GetCpuStats()

			if err != nil {
				return err
			}

			memoryStats, err := memory.GetMemoryStats()

			if err != nil {
				return err
			}

			diskStats, err := disk.GetDiskStats("/")

			if err != nil {
				return err
			}

			var cores []*pb.CPUCoreUsage

			keys := make([]string, 0, len(cpuStats.CoresUsage))
			for k := range cpuStats.CoresUsage {
				keys = append(keys, k)
			}
			sort.Slice(keys, func(i, j int) bool {
				numI, _ := strconv.Atoi(strings.TrimPrefix(keys[i], "cpu"))
				numJ, _ := strconv.Atoi(strings.TrimPrefix(keys[j], "cpu"))
				return numI < numJ
			})

			for _, core := range keys {
				usage := cpuStats.CoresUsage[core]
				cores = append(cores, &pb.CPUCoreUsage{
					Core:  core,
					Usage: usage,
				})
			}
			cpuResp := &pb.CPUStatsResponse{
				TotalUsage: cpuStats.TotalUsage,
				Btime:      cpuStats.BTime,
				CoresUsage: cores,
			}

			memoryResp := &pb.MemoryUsage{Total: memoryStats.MemTotal, Used: memoryStats.MemUsed}

			diskResp := &pb.DiskUsage{Total: diskStats.Total, Used: diskStats.Used}

			resp := &pb.StatsResponse{
				CpuUsageTotal: cpuResp,
				MemoryUsage:   memoryResp,
				DiskUsage:     diskResp,
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
