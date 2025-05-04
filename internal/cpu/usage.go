package cpu

import (
	"os"
	"strconv"
	"strings"
	"time"
)

type CPUStats struct {
	TotalUsage float64
	CoresUsage map[string]float64
	BTime      uint64
}

func sumSlice(slice []uint64) uint64 {
	var sum uint64
	for _, v := range slice {
		sum += v
	}
	return sum
}

func readStatSnapshot() (map[string][]uint64, uint64, error) {
	data, err := os.ReadFile("/proc/stat")
	if err != nil {
		return nil, 0, err
	}

	result := make(map[string][]uint64)
	var btime uint64

	lines := strings.Split(string(data), "\n")
	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) == 0 {
			continue
		}

		key := fields[0]
		if key == "btime" {
			btime, _ = strconv.ParseUint(fields[1], 10, 64)
			continue
		}

		if key == "cpu" || strings.HasPrefix(key, "cpu") {
			var nums []uint64
			for _, f := range fields[1:] {
				n, err := strconv.ParseUint(f, 10, 64)
				if err != nil {
					return nil, 0, err
				}
				nums = append(nums, n)
			}
			result[key] = nums
		}
	}
	return result, btime, nil
}

func GetCpuStats() (CPUStats, error) {
	s1, btime, err := readStatSnapshot()

	if err != nil {
		return CPUStats{}, err
	}

	time.Sleep(100 * time.Millisecond)

	s2, _, err := readStatSnapshot()

	if err != nil {
		return CPUStats{}, err
	}

	stats := CPUStats{
		CoresUsage: make(map[string]float64),
		BTime:      btime,
	}

	for cpu := range s1 {

		idle1 := s1[cpu][3]
		idle2 := s2[cpu][3]

		total1 := sumSlice(s1[cpu])
		total2 := sumSlice(s2[cpu])

		usage := 1.0 - float64(idle2-idle1)/float64(total2-total1)
		usage *= 100.0

		if cpu == "cpu" {
			stats.TotalUsage = usage
		} else {
			stats.CoresUsage[cpu] = usage
		}
	}

	return stats, nil
}
