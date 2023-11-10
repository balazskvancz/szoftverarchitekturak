package middlewares

import (
	"net/http"

	"github.com/balazskvancz/gateway"
)

var (
	allowedResponseHeaders string = "Access-Control-Allow-Origin, Authorization, Content-Type"
	allowedMethods         string = http.MethodGet + ", " + http.MethodPost + ", " + http.MethodDelete + ", " + http.MethodPut
)

// Cors visszaad egy egy olyan middleware-t amely beállítja a DEV környezetben szükséges headereket.
func Cors() gateway.MiddlewareFunc {
	return func(ctx gateway.Context, next gateway.HandlerFunc) {
		headers := http.Header{
			"Access-Control-Allow-Origin":      []string{"http://localhost:8080"},
			"Access-Control-Allow-Headers":     []string{allowedResponseHeaders},
			"Access-Control-Allow-Methods":     []string{allowedMethods},
			"Access-Control-Allow-Credentials": []string{"true"},
		}

		ctx.AppendHttpHeader(headers)

		next(ctx)

	}
}
