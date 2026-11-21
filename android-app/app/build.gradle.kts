plugins {
  alias(libs.plugins.android.application)
}

android {
  namespace = "com.playlearn.children"
  compileSdk = 36
  defaultConfig {
    applicationId = "com.playlearn.children"
    minSdk = 24
    targetSdk = 36
    versionCode = 1
    versionName = "1.0.0"
  }

  buildTypes {
    release {
      isMinifyEnabled = false
    }
  }
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }
  buildFeatures {
    aidl = false
    buildConfig = false
    shaders = false
  }
}
