#!/bin/sh

mkdir -p ./src/proto/gen
protoc -I=./src/proto $1 --js_out=import_style=commonjs,binary:./src/proto/gen --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/proto/gen