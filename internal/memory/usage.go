package memory

import (
	"os"
	"strconv"
	"strings"
)

type MemoryStats struct {
	MemTotal uint64
	MemAvail uint64
	MemUsed  uint64
}

func GetMemoryStats() (MemoryStats, error) {
	data, err := os.ReadFile("/proc/meminfo")

	if err != nil {
		return MemoryStats{}, err
	}

	lines := strings.Split(string(data), "\n")

	memtotal, err := strconv.ParseUint(strings.Fields(lines[0])[1], 10, 64)
	if err != nil {
		return MemoryStats{}, err
	}
	memtotal *= 1024

	memavail, err := strconv.ParseUint(strings.Fields(lines[2])[1], 10, 64)

	if err != nil {
		return MemoryStats{}, err
	}

	memavail *= 1024

	return MemoryStats{
		MemTotal: memtotal,
		MemAvail: memavail,
		MemUsed:  memtotal - memavail,
	}, nil

}
