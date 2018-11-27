#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n br.rnwithserverless.app/host.exp.exponent.MainActivity
