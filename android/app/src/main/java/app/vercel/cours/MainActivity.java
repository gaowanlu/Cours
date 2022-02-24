package app.vercel.cours;


import android.content.IntentFilter;
import android.net.http.SslError;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import app.vercel.cours.receiver.NetworkChangeReceiver;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private IntentFilter intentFilter;
    private NetworkChangeReceiver networkChangeReceiver;
    private Boolean netCanUse=null;

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_main);
        hiddenBottomVirtualButton();
        initElement();
        webViewSetting();
        setActions();
    }

    /**
     * 初始化组件
     */
    private void initElement(){
        //webview
        webView=this.findViewById(R.id.cours_webview);
        //初始化网络状况广播接收器
        intentFilter = new IntentFilter();
        intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
        networkChangeReceiver = new NetworkChangeReceiver((boolean d)->{
            Log.e("网络状况",Boolean.toString(d));
            if(null==netCanUse){
                MainActivity.this.netCanUse=d;
            }
            if(netCanUse!=d){//网络状况改变时重新加载Web应用
                MainActivity.this.netCanUse=d;
                webView.reload();
            }
        });
        registerReceiver(networkChangeReceiver, intentFilter);
    }

    /**
     * 初始化组件活动
     */
    private void setActions(){
        webView.loadUrl(this.getString(R.string.app_web_path));
    }

    /**
     * WebView配置
     */
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private void webViewSetting(){
        webView.setWebViewClient(new WebViewClient(){
            @Override public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error){
                Log.e("SSL ERROR","SSL ERROR");
                handler.proceed();
            }

            @Override
            public void onScaleChanged(WebView view, float oldScale, float newScale) {
                Log.i("用户尝试改变比例","");
                //super.onScaleChanged(view, oldScale, newScale);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                Log.e("资源请求错误","");
                super.onReceivedError(view, request, error);
            }
        });
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAppCacheEnabled(true);
        webView.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
    }

    /**
     * 隐藏虚拟按键
     */
    private void hiddenBottomVirtualButton(){
        View decorView = getWindow().getDecorView();
        int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN;
        decorView.setSystemUiVisibility(uiOptions);
    }

    /**
     * 劫持返回键
     * @param keyCode
     * @param event
     * @return
     */
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if(keyCode==KeyEvent.KEYCODE_BACK&&webView.canGoBack()){
            webView.goBack();//返回前一个页面
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    /**
     * 活动销毁Hook
     */
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(networkChangeReceiver);
    }
}