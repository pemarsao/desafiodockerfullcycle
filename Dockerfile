FROM clearlinux/golang:latest as build

WORKDIR /app

COPY ${PWD}/app/helloworld.go /app/

RUN go build helloworld.go

FROM scratch
WORKDIR /app
COPY --from=build /app .
CMD ["./helloworld"]