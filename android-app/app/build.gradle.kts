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
    versionCode = 2
    versionName = "1.0.1"
  }

  androidResources {
    // Include Next.js "_next/" assets folder (omit default !_* / <dir>_* exclusion!)
    ignoreAssetsPattern = "!.svn:!.git:!.ds_store:!*.scc:!CVS:!thumbs.db:!picasa.ini:!*~"
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
