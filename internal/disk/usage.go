package disk

import "syscall"

type DiskStats struct {
	Total uint64
	Free  uint64
	Used  uint64
}

func GetDiskStats(path string) (DiskStats, error) {
	var stat syscall.Statfs_t

	if err := syscall.Statfs(path, &stat); err != nil {
		return DiskStats{}, err
	}

	total := stat.Blocks * uint64(stat.Bsize)
	free := stat.Bfree * uint64(stat.Bsize)

	return DiskStats{
		Total: total,
		Free:  free,
		Used:  total - free,
	}, nil
}
