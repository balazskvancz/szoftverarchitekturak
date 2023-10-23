BINARY_NAME="gateway"
WINDOWS_NAME="gateway.exe"

build:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -o ${BINARY_NAME} .

windows:
	GOOS=windows GOARCH=amd64 go build -a -o ${WINDOWS_NAME}

mac:
	GOOS=darwin GOARCH=amd64 go build -o ${BINARY_NAME} .

clean:
	rm -rf ${BINARY_NAME}
