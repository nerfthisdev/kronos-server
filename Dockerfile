FROM golang:1.23.3 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o kronos-server ./cmd/server

# --- Final stage ---
FROM alpine:latest


WORKDIR /root/

COPY --from=builder /app/kronos-server .

EXPOSE 50051

CMD ["./kronos-server"]

