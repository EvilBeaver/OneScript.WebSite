<script setup type="module" lang="ts">
</script>

<style module>

.telegram-button{
    cursor: pointer;
    background-color: #0088cc;
    border-radius: 3px;
    padding: 13px 17px;
    
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 14px;
    color: #FFF;
    text-decoration: none;
}

a.telegram-button {
    color: #FFF;
    text-decoration: none;
}

a.telegram-button:hover {
    color: #FFF;
    text-decoration: none;
}

.telegram-button:hover{
    background-color: #007dbb;
}

.telegram-button:active{
    background-color: #026698;
}

.telegram-button i{
    display: inline-block;
    height: 12px;
    width: 14px;
    vertical-align: middle;
    margin-right: 15px;
    
    background: url('https://telegram.org/img/oauth/tg_button_small.png') no-repeat;
    background-size: contain;
}

.telegram-button span{
    display: inline-block;
    vertical-align: top;
}

</style>

<template>
    <div id="donate">
        <iframe src="https://yoomoney.ru/quickpay/button-widget?targets=&default-sum=100&button-text=11&yoomoney-payment-type=on&button-size=m&button-color=orange&successURL=&quickpay=small&account=410013915014133&" width="184" height="36" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
        <p>
            <a :class="$style['telegram-button']" href="https://t.me/tribute/app?startapp=dnj5">
                <i></i>
                <span>Telegram</span>
            </a>
        </p>
    </div>
</template>