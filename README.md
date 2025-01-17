# CoonMonit

# Installation Guide - MetaTrader to Prometheus Exporter

This guide will help you set up the backend infrastructure for the CoonMonit MetaTrader to Prometheus Exporter.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git to clone the repository
- Basic understanding of YAML configuration files

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/RaccoonTradingClub/CoonMonit
cd CoonMonit
```

### 2. Configure Prometheus

Edit the `config/prometheus.yml` file:


### 3. Configure Caddy (Reverse Proxy)

Edit the `config/Caddyfile`:


### 4. Configure Docker Compose

Edit the `docker-compose.yml` file:


### 5. Launch the Stack

Run the following commands to start all services:

```bash
# Pull the latest images
docker compose pull

# Start the stack in detached mode
docker compose up -d
```

### 6. Verify Installation

1. Check if all containers are running:
```bash
docker compose ps
```

2. Access the different services:
- Grafana: http://localhost:3000 (default credentials: admin/ChangeMe)
- Prometheus: http://localhost:9090
- Metrics endpoint: http://localhost:9091/metrics

## Troubleshooting

If you encounter any issues:

1. Check container logs:
```bash
docker compose logs [service_name]
```

3. Common issues:
- Port conflicts: Ensure ports 9090, 3000, and 9091 are not used by other services
- Permission issues: Check folder permissions for mounted volumes
- Configuration errors: Validate YAML syntax in configuration files

## Security Notes

- Change the default Grafana password in docker-compose.yml
- Consider implementing additional security measures like basic authentication
- Use HTTPS in production environments

## Next Steps

After successful installation:
1. Configure your MetaTrader client to connect to the exporter
2. Import the provided or create Grafana dashboards
3. Set up your first alerts in Grafana if needed

For additional support or issues, please refer to our GitHub repository or support channels.
