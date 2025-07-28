aws ecr get-login-password --region ap-southeast-1 | \
kubectl create secret docker-registry regcred \
  --docker-server=127214175530.dkr.ecr.ap-southeast-1.amazonaws.com \
  --docker-username=AWS \
  --docker-password="$(aws ecr get-login-password --region ap-southeast-1)" \
  --namespace=default