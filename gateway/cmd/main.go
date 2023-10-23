package main

import (
	"fmt"
	"os"

	"github.com/balazskvancz/gateway"
)

const (
	configPath string = "./config.json"
)

func main() {
	gw, err := gateway.NewFromConfig(configPath)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	gw.Start()
}
