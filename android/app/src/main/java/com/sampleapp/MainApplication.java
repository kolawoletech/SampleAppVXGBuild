package com.sampleapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.mybigday.rnmediameta.RNMediaMetaPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.ksyun.media.reactnative.ReactKSYVideoPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import io.vxg.reactnative.RCTVXGMobileSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new KCKeepAwakePackage(),
            new RNMediaMetaPackage(),
            new NetInfoPackage(),
            new RNFetchBlobPackage(),
            new RNFSPackage(),
            new RNCWebViewPackage(),
            new LinearGradientPackage(),
            new ReactVideoPackage(),
            new ReactKSYVideoPackage(),
            new RNDeviceInfo(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new ReanimatedPackage(),
            new RCTVXGMobileSDKPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
