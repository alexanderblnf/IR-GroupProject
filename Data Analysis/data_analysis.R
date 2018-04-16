library(Rcmdr)
library(gvlma)
library(car) #Package includes Levene's test 
library(ggplot2)
library(gmodels)
library(nlme)

csvData <- read.csv(file = "dataset.csv", header=TRUE, sep = ",")

csvData$interface[csvData$experiment == 1 & csvData$task <= 7] <- 1
csvData$interface[csvData$experiment == 1 & csvData$task > 7] <- 2
csvData$interface[csvData$experiment == 2 & csvData$task <= 7] <- 1
csvData$interface[csvData$experiment == 2 & csvData$task > 7] <- 3
csvData$interface[csvData$experiment == 3 & csvData$task <= 7] <- 4
csvData$interface[csvData$experiment == 3 & csvData$task > 7] <- 5
csvData$interface[csvData$experiment == 4 & csvData$task <= 7] <- 6
csvData$interface[csvData$experiment == 4 & csvData$task > 7] <- 7

csvData$interface<-factor(csvData$interface, levels = c(1:7), 
                          labels = c("Cat Hover","List Hover", "List Inline", "Cat Inline", "Cat w/o Names", "List w/ CatNames", "Cat Browse"))

meansByInterface <- aggregate(status ~ user + interface, data = csvData, 
                              FUN=function(x) length(which(x == 0)))
finalStatusSum <- aggregate(status ~ interface, data = meansByInterface, FUN=sum)
finalStatusMeans <- aggregate(status ~ interface, data = meansByInterface, FUN=mean)

finalTimeMeans <- aggregate(time ~ interface, data = csvData, FUN=mean)

auxData <- csvData
auxData$time <- log(auxData$time)
finalTimeMeans$time <- log(finalTimeMeans$time)

finalTimeMeans$time

png(file="mean_times_log.png", width = 1920, height = 1080, res=300)
ggplot(auxData, aes(interface, time)) + 
  geom_boxplot() + 
  geom_bar(fill="transparent", colour="red", data = finalTimeMeans, aes(interface, time), stat = "identity") +
  ylim(0, 5) +
  ylab("Mean log search time") +
  xlab("Interface Type") +
  ggtitle("Mean search time by interface") +
  theme(text = element_text(size=9), axis.text.x = element_text(size= 7, hjust=0.5, margin = margin(t = 3, b = 3)), plot.title = element_text(hjust = 0.5)) 
dev.off()

csvData$time <- log(csvData$time)

truncData <- csvData[csvData$interface == "Cat Hover" | csvData$interface == "Cat Inline" | csvData$interface == "List Hover" | csvData$interface == "List Inline",]
truncData$isCategory[truncData$interface == "Cat Hover" | truncData$interface == "Cat Inline"] <- 1
truncData$isCategory[truncData$interface == "List Hover" | truncData$interface == "List Inline"] <- 0
truncData$isHover[truncData$interface == "Cat Hover" | truncData$interface == "List Hover"] <- 1
truncData$isHover[truncData$interface == "Cat Inline" | truncData$interface == "List Inline"] <- 0

truncData$isCategory <- factor(truncData$isCategory, levels=c(0:1), labels=c("No", "Yes"))
truncData$isHover <- factor(truncData$isHover, levels=c(0:1), labels=c("No", "Yes"))

linearModel <- aov(time ~ isCategory * isHover * gender, data=truncData)
anova(linearModel)
summary(linearModel)

t.test(truncData[truncData$isCategory == "Yes",]$time, truncData[truncData$isCategory == 'No',]$time)

aggregate(user ~ gender, data = csvData, FUN=length)

truncData <- csvData[csvData$interface == "Cat Inline" | csvData$interface == "List Inline" | csvData$interface == "List w/ CatNames",]

catNames <- csvData[csvData$interface == "List w/ CatNames",]
listInline <- csvData[csvData$interface == "List Inline",]
catInline <- csvData[csvData$interface == "Cat Inline",]
noCatNames <- csvData[csvData$interface == "Cat w/o Names",]
catHover <- csvData[csvData$interface == "Cat Hover",]
listHover <- csvData[csvData$interface == "List Hover",]
catBrowse <- csvData[csvData$interface == "Cat Browse",]

t.test(catNames$time, listInline$time)
t.test(catNames$time, catInline$time)
t.test(noCatNames[noCatNames$user != 10,]$time, catInline[catInline$user != 10,]$time, paired=TRUE)
t.test(noCatNames$time, listInline$time)
t.test(catBrowse$time, catInline$time)
t.test(catBrowse$time, catNames$time, paired = TRUE)

categoryData <- csvData[csvData$interface == "Cat Inline" | csvData$interface == "Cat Hover" | csvData$interface == "Cat w/o Names" | csvData$interface == "Cat Browse",]
listData <- csvData[csvData$interface == "List Inline" | csvData$interface == "List Hover" | csvData$interface == "List w/ CatNames",]

csvData$isCategory[csvData$interface == "Cat Inline" | csvData$interface == "Cat Hover" | csvData$interface == "Cat w/o Names" | csvData$interface == "Cat Browse"] <- "Category"
csvData$isCategory[csvData$interface == "List Inline" | csvData$interface == "List Hover" | csvData$interface == "List w/ CatNames"] <- "List"

ggplot(csvData, aes(isCategory, time)) + 
  geom_bar(data = csvData, aes(isCategory, time), stat = "summary", fun.y="mean") +
  xlab('Interface Type') +
  ylab('Mean Time')

timePerTaskList <- aggregate(time ~ task * interface, data=listData, FUN=mean)
timePerTaskCategory <- aggregate(time ~ task * interface, data=categoryData, FUN=mean)

timePerTaskListMedian <- aggregate(time ~ task * interface, data=listData, FUN=median)
timePerTaskCategoryMedian <- aggregate(time ~ task * interface, data=categoryData, FUN=median)

timePerTaskList$categoryTime <- timePerTaskCategory$time

t.test(listHover$hover, catHover$hover)
t.test(listHover$click, catHover$click)
