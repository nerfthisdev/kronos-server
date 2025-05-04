package cpu

import (
	"os"
	"strconv"
	"strings"
	"time"
)

func readCPUStat() (uint64, uint64, error) {
	data, err := os.ReadFile("/proc/stat")
	if err != nil {
		return 0, 0, err
	}

	fields := strings.Fields(strings.Split(string(data), "\n")[0])[1:]

	var values []uint64

	for _, f := range fields {
		v, _ := strconv.ParseUint(f, 10, 64)
		values = append(values, v)
	}

	idle := values[3]
	var total uint64

	for _, v := range values {
		total += v
	}

	return idle, total, nil
}

func GetCPUUsage() (float64, error) {
	idle1, total1, err := readCPUStat()

	if err != nil {
		return 0, err
	}

	time.Sleep(1 * time.Second)
	idle2, total2, err := readCPUStat()

	if err != nil {
		return 0, err
	}

	deltaIdle := idle2 - idle1
	deltaTotal := total2 - total1

	cpuUsage := (1.0 - float64(deltaIdle)/float64(deltaTotal)) * 100

	return cpuUsage, nil
}
