# Smart Inventory Management System

## Project Idea

Businesses often track inventory inefficiently, which leads to stock-outs or overstocking. This project builds a system that tracks inventory in real time, sends alerts when stock runs low, and produces reports for managers.

The focus is on DevOps practices: containerized microservices, automated CI/CD, Kubernetes deployment, infrastructure as code, configuration management, and monitoring on AWS.

**Tools:** Jenkins, Docker, Kubernetes, Prometheus, Grafana, Ansible, Terraform, AWS (EC2, S3, VPC), Nginx, Git

## Team Members

| Name | GitHub |
|------|--------|
| Mohamed Sohiel Sayed Ibrahim | [@Mohamed-Sohiel-Sayed](https://github.com/Mohamed-Sohiel-Sayed) |
| Mariana Ghaly Mahrous Wahba | _TBD_ |
| Michael Sameih Wilson Garas | _TBD_ |
| Muhamed Hisham Ahmed Muhamed | _TBD_ |
| Omar Mohamed Alghareeb Ahemd | _TBD_ |
| Mohamed Osama Mabrouk Younis | _TBD_ |

## Work Plan

| Phase | Tasks | Deliverables | Timeline |
|-------|-------|--------------|----------|
| 1. Application | Build inventory tracking service, low-stock alert service, and manager web dashboard | Inventory service, alert service, dashboard | Oct 15 – Nov 7 |
| 2. Containerization | Write Dockerfiles for each service; test locally with Docker Compose | Docker images | Nov 1 – Nov 10 |
| 3. Infrastructure | Provision AWS EC2, S3, and VPC with Terraform; configure servers with Ansible | Terraform scripts, Ansible playbooks | Nov 1 – Nov 14 |
| 4. Orchestration | Deploy services on Kubernetes; set up Nginx for dashboard access | Kubernetes manifests, Nginx config | Nov 10 – Nov 18 |
| 5. CI/CD | Build a Jenkins pipeline that builds, tests, pushes images, and deploys | Jenkinsfile | Nov 14 – Nov 22 |
| 6. Monitoring | Set up Prometheus metrics and alerts, and Grafana dashboards | Monitoring configs, dashboards | Nov 18 – Nov 25 |
| 7. Documentation | Final docs, demo, and presentation | README, demo | Nov 24 – Nov 30 |

## Roles & Responsibilities

| Role | Responsibilities | Member |
|------|------------------|--------|
| Backend Developer | Inventory service and low-stock alert service | _TBD_ |
| Frontend Developer | Manager web dashboard | _TBD_ |
| Containers & Kubernetes | Dockerfiles, Kubernetes manifests, Nginx | _TBD_ |
| Infrastructure | Terraform (AWS) and Ansible | _TBD_ |
| CI/CD | Jenkins pipeline | _TBD_ |
| Monitoring | Prometheus and Grafana | _TBD_ |

## KPIs

| KPI | Target |
|-----|--------|
| Deployment time (commit → running in cluster) | < 10 minutes |
| Pipeline success rate | ≥ 90% |
| Service uptime | ≥ 99% |
| Low-stock alert delay | < 1 minute |
| Infrastructure provisioned by code | 100% (no manual setup) |
| Recovery from a failed pod | Automatic, < 2 minutes |

## Instructor

Eng. Ahmed Gamil

## Project Files

| Path | Contents |
|------|----------|
| `services/inventory/` | Inventory tracking service |
| `services/alert/` | Low-stock alert service |
| `dashboard/` | Manager web dashboard |
| `k8s/` | Kubernetes manifests |
| `terraform/` | AWS infrastructure scripts |
| `ansible/` | Server and service configuration playbooks |
| `monitoring/` | Prometheus and Grafana configs |
| `nginx/` | Nginx configuration |
| `Jenkinsfile` | CI/CD pipeline |
