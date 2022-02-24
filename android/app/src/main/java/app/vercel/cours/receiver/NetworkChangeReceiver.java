package app.vercel.cours.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

/**
 * 网络可用性广播接收器
 */
public class NetworkChangeReceiver extends BroadcastReceiver {
    private NetWorkChangeEvent netWorkChangeEvent;
    public NetworkChangeReceiver(NetWorkChangeEvent netWorkChangeEvent){
        super();
        this.netWorkChangeEvent=netWorkChangeEvent;
    }
    @Override
    public void onReceive(Context context, Intent intent) {
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isAvailable()) {
            netWorkChangeEvent.onchange(true);
        } else {
            netWorkChangeEvent.onchange(false);
        }
    }
    /**
     * 网络状态改变事件
     */
    public interface NetWorkChangeEvent {
        void onchange(boolean canUse);
    }
}

