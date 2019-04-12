<style scoped>
.invoke-container {
    width:1180px;
    margin: 0 auto;
    text-align: left;
}
.invoke-params {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    height: 80px;
}

.title {
    font-size: 20px;
    font-weight: bold;
}

.sub-title {
    font-size: 18px;
    font-weight: 400;
    color: #000000;
}
.invoke-item {
    margin-bottom: 20px;
}

</style>
<template>
    <div class="invoke-container">
        <div class="invoke-item">
            <p class="title">Step 1：Send the transaction request. 
                (The backend side will sign and  send the request actually. Here the front side will do that for test) </p>
            <p><span class="sub-title">ONT ID of App：</span> {{provider.ontid}}</p>
            <p><span class="sub-title">Parameters of the request： </span></p>
            <textarea v-model="requestData" class="invoke-params"></textarea>
            <button @click="sendRequest" class="btn">Send Request</button>
            <p><span class="sub-title">Response of the request</span></p>
            <textarea :value="JSON.stringify(responseData)" class="invoke-params"></textarea>
        </div>

        <div class="invoke-item">
            <p class="title">Step 2: Go to the payment page</p>
            <button class="btn" @click="toPaymentPage">To the payment</button>
        </div>

        <div class="invoke-item">
            <p class="title">Step3: Recived result of the transaction</p>
            <p>{{txhash}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import * as b64 from 'base64-url';
import { ONTID_BACKEND, ONTID_FRONTEND } from '../common/config'
export default {
    name: 'InvokeSc',
    data() {
        const nonce = Math.random().toString(36).substring(7);
        const wallet = JSON.parse(sessionStorage.getItem('wallet'))
          // The ONT ID of dapp registerd on TestNet
        const provider = {
                "public_key": "035fec6acab834f28723797ea0f1e0a6fe6f76c54345ca91b098a92e3788c7df65",
                "wif": "KyASnW1jYqqKRiq8YtXeGZN4ewmZVCsGPpxUe2iHHZjyB1nTxkgt",
                "ontid": "did:ont:ANDQ4CGTGqYcVPiSkb6z8bFkncq2kimnAs"
            }
        const params = {
                "invokeConfig": {
                    "contractHash": "0200000000000000000000000000000000000000",
                    "functions": [{
                        "operation": "transfer",
                        "args": [{
                            "name": "arg0-from",
                            "value": "Address:" + wallet.address
                        },
                        {
                            "name": "arg1-to",
                            "value": "Address:AXK2KtCfcJnSMyRzSwTuwTKgNrtx5aXfFX"
                        },
                        {
                            "name": "arg2-amount",
                            "value": "Long:10000000000000"
                        }
                        ]
                    }],
                    "payer": wallet.address,
                    "gasLimit": 20000,
                    "gasPrice": 500
                },
                "app": {
                    "name": "My Awesome DApp",
                    "logo":"",
                    "message": "transferONG",
                    "ontid": provider.ontid,
                    "callback": "", 
                    "nonce": nonce
                }
            }
        return {
            requestData: JSON.stringify(params),
            // The ONT ID of dapp registerd on TestNet
            provider,
            responseData: {
                orderId: '',
                invoke_token: ''
            },
            txhash: ''
        }
    },
    mounted() {
        const {txhash} = { ...this.$route.query }
        if(txhash) {
            this.txhash = txhash;
            alert('Transaction completed. Transaction hash: ' + txhash);
        }
    },
    methods: {
        sendRequest() {
            // construct jwt
            const jwtObj = {
                header: {
                    "alg": "ES256",
                    "typ": "JWT"
                }, 
                payload: {
                    ...JSON.parse(this.requestData),
                    exp: new Date('2019-04-30').getTime()
                }
            }
            const jwtHeader = b64.encode(JSON.stringify(jwtObj.header), 'utf-8');
            const jwtPayload = b64.encode(JSON.stringify(jwtObj.payload), 'utf-8');
            // generate signature
            const messageStr = jwtHeader + '.' + jwtPayload
            const messageHex = Ont.utils.str2hexstr(messageStr)

            const privateKey = Ont.Crypto.PrivateKey.deserializeWIF(this.provider.wif)
            const publicKey = new Ont.Crypto.PublicKey(this.provider.public_key)
            
            const signature = privateKey.sign(messageHex);
            console.log('signature: ' + signature)
            const verify = publicKey.verify(messageHex, signature)
            console.log('verify: ' + verify)
            
            const jwtSignature = b64.encode(signature.serializeHex())
            const jwt = jwtHeader + '.' + jwtPayload + '.' + jwtSignature;

            // 构造请求
            const host = ONTID_BACKEND
            const url = host + '/api/v1/provider/request/order'
            const user = sessionStorage.getItem('ontid')
            const body = {
                app_token: jwt,
                user
            }
            axios.post(url, body, {
                headers: {
                    access_token: sessionStorage.getItem('access_token')
                }
            }).then(res => {
                console.log(res)
                this.responseData = res.data.result;
            })

        },
        toPaymentPage() {
            const callback = location.href;
            const params = encodeURIComponent(`${this.responseData.orderId}&${this.responseData.invoke_token}&${callback}`)
            const url = ONTID_FRONTEND + '/transaction?params=' + params
            window.open(url, '_blank')
        }
    }
}
</script>
