package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

const filePath string = "./input.txt"

func main() {
	f, _ := os.Open(filePath)

	counter := 0

	r := csv.NewReader(bufio.NewReader(f))
	for {
		record, err := r.Read()

		if err == io.EOF {
			break
		}

		integer, _ := strconv.Atoi(strings.Join(record, ""))
		counter = counter + integer
	}
	fmt.Println(counter)
}
