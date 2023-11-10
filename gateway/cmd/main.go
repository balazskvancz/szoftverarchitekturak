package main

import (
	"fmt"
	"os"

	"github.com/balazskvancz/gateway"
	"github.com/balazskvancz/gorouter"
	"github.com/balazskvancz/szoftverarchitekturak/gateway/internal/middlewares"
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

	var alwaysMatching = func(ctx gateway.Context) bool { return true }

	gw.RegisterMiddleware(
		gorouter.NewMiddleware(
			middlewares.Cors(),
			gorouter.MiddlewareWithMatchers(alwaysMatching),
			gorouter.MiddlewareWithAlwaysAllowed(true),
		),
	)

	gw.Start()
}
