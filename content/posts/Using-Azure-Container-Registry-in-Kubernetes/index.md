---
title: Using Azure Container Registry in Kubernetes
date: 2019-02-02
---
Azure Container Registry is a private Docker registry for your Docker images. The registry can be replicated across regions automatically, keeping the images close to the compute. Azure Container Registry can also be used as a private repository location for your Docker images you do not wish to publish.

I am documenting here the process of how to use a private Azure Container Registry with your Kubernetes environment. There are others out there that I tried and not one of them had the correct method for various things, so I am keeping this here also for my own use 🙂

# Step 0: Assumptions
I am assuming you have a registry created in Azure. If you don’t, do that first (you don’t actually have to but your intended registry name might be taken so just makes sense to get that first really).
Create your Azure Container Registry [here](https://portal.azure.com/#create/Microsoft.ContainerRegistry).
I also am assuming you have Azure Command Line Interface. You need it so get it [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).
I also am assuming you are signed into a Kubernetes cluster in **kubectl**

# Step 1: Tag your image
Now that your image is built, you must tag it with the location of your registry. You do not have to do anything in Azure at this stage (the register location is made based on the tag). Tag the image with the registry domain followed by the image name (in the form of a URL) like below:
```shell
docker tag facility-rating gspncr.azurecr.io/facility-rating
```

# Step 2: Docker login
Login to the private registry using docker login. The login will check if you already have an Azure CLI session and if you don’t will prompt you to login. Use the credentials here that you use for logging into the Azure online portal. Like mine below.
```shell
docker login gspncr.azurecr.io
```

# Step 3: Push to your Azure Container Registry
Now that the image is tagged, you can push it. The speed of this depends on the size of your image build.
```shell
docker push gspncr.azurecr.io/facility-rating
```

# Step 4: Creating a secret in Kubernetes
This is the part that was difficult to find a sensible process anywhere in the web but here I have documented it. What we are doing here is creating a secret that Kubernetes will use to authenticate against the Azure Container Registry. It is much simpler than other sources shown, use my command below, and find below that where to find these details.
```shell
kubectl create secret docker-registry SECRET-NAME --docker-server REGISTRY.azure
```

**SECRET-NAME** : this can be anything, I named mine az-k8s-auth
**REGISTRY.azurecr.io** : this is the URL for your container registry, e.g.

![](https://d2ew3xvzve50rf.cloudfront.net/wp-content/uploads/2019/02/27122724/k8s-secrets-1024x506.png)

**AZURE-EMAIL-ADDRESS** : quite simply, the email you are signing into Azure with.
**ACR-USER** : In your container registry, go to Access Keys and find Username. Make sure you have Admin User enabled.
**ACR-PASSWORD** : In your container registry, to to Access Keys, copy one of the generated admin passwords.

![](https://d2ew3xvzve50rf.cloudfront.net/wp-content/uploads/2019/02/27121936/container-registry-access.png)

# Step 5: Deploy your app
Now you can deploy to your Kubernetes cluster using Azure Container Registry URL’s. If you want to learn more of that I have attached steps below.

![](https://d2ew3xvzve50rf.cloudfront.net/wp-content/uploads/2019/02/27122724/k8s-secrets-1024x506.png)

View your secrets in Kubernetes, check the one you created in step 4 is appeared there so that it can be used.

![](https://d2ew3xvzve50rf.cloudfront.net/wp-content/uploads/2019/02/27122823/az-registry.png)

In Azure Container Registry click on Repositories and check that the image you pushed in step 3 is there. Azure does not tell you what is the URL for the repository but it actually is what we specified in the tag earlier. So for mine is gspncr.azurecr.io/failway

![](https://d2ew3xvzve50rf.cloudfront.net/wp-content/uploads/2019/02/27122941/k8s-gui-deploy-1024x566.png)

For deploying in the Kubernetes UI, see you can use the container image URL for the Azure repo. You also must specify the image pull secret otherwise the pod will fail to deploy:

![](https://d2ew3xvzve50rf.cloudfront.net/wp-content/uploads/2019/02/27123227/azure-secret.png)

Where that is hidden inside of **advanced options**. Also a pro tip, if you have saved your secret to a namespace, make sure it is the same namespace where you are deploying your application. In this example it is available across all of the namespaces.