package main

import (
	"context"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	monitorpb "github.com/nerfthisdev/kronos-server/proto"
	pb "github.com/nerfthisdev/kronos-server/proto"
)

func main() {
	conn, err := grpc.NewClient("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewMonitorServiceClient(conn)
	stream, err := client.StreamStats(context.Background(), &monitorpb.StatsRequest{})
	if err != nil {
		log.Fatalf("Error on StreamStats: %v", err)
	}

	for {
		resp, err := stream.Recv()
		if err != nil {
			log.Fatalf("Error receiving: %v", err)
		}

		log.Printf("%f", resp.DiskUsage)
		log.Printf("%f", resp.MemoryUsage)

		cpuStats := resp.CpuUsageTotal

		log.Printf("Total: %.2f%%, BTime: %s", cpuStats.TotalUsage, time.Unix(int64(cpuStats.Btime), 0))
		for _, core := range cpuStats.CoresUsage {
			log.Printf("Core %s: %.2f%%", core.Core, core.Usage)
		}
	}
}
