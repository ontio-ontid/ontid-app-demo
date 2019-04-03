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
.btn {
		background:#2472CC;
		color:rgba(255,255,255,1);
		border:0;
		outline: none;
		cursor: pointer;
        height:40px;
        padding: 0 30px;
        font-size: 18px;
	}
	.btn:hover {
		background:#4688D5;
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
export default {
    name: 'InvokeSc',
    data() {
        //TODO params中不能包含中文否则后台无法解析base64
        const params = {
                "invokeConfig": {
                    "contractHash": "0200000000000000000000000000000000000000",
                    "functions": [{
                        "operation": "transfer",
                        "args": [{
                            "name": "arg0-from",
                            "value": "Address:AcuBbdmNk6NjAR2uuDegXK5AUkHcuRXyJH"
                        },
                        {
                            "name": "arg1-to",
                            "value": "Address:AXK2KtCfcJnSMyRzSwTuwTKgNrtx5aXfFX"
                        },
                        {
                            "name": "arg2-amount",
                            "value": "Long:100000000"
                        }
                        ]
                    }],
                    "payer": "AcuBbdmNk6NjAR2uuDegXK5AUkHcuRXyJH",
                    "gasLimit": 20000,
                    "gasPrice": 500
                },
                "app": {
                    "name": "My Awesome DApp",
                    "logo":"",
                    "message": "transferONG",
                    "ontid": "did:ont:ATJpbW9Cn39zKnkmhnNPrA4XvcSzaogm2T",
                    "callback": "", 
                    "createtime": 1552541388,
                    "expire": 1556620993,
                    "nonce": 5434536
                }
            }
        return {
            requestData: JSON.stringify(params),
            // 本地注册的第三方ONT ID数据
            provider: {
                "public_key": "020c8e5479c2f024bcda81009f6525bda8db6726f3948b130b3a762a1db03e55a1",
                "wif": "L18iBWjQLyzJ72SgcMQvedDJ2jYnGqp5x8mHJNW3KNe6mnx8ZEZE",
                "manage_public_key": "026d3557e55fffe7bc5a9a8fc0c7361bc48590c17bf4d0d345e3f354bb64a0452a",
                "ontid": "did:ont:ATJpbW9Cn39zKnkmhnNPrA4XvcSzaogm2T"
            },
            responseData: {
                orderid: '',
                access_token: ''
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
                payload: JSON.parse(this.requestData)
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
            const host = 'http://localhost:10332'
            const url = host + '/api/v1/ontid/request/order'
            const user = 'did:ont:AcuBbdmNk6NjAR2uuDegXK5AUkHcuRXyJH'
            const body = {
                data: jwt,
                user
            }
            axios.post(url, body).then(res => {
                console.log(res)
                this.responseData = res.data.result;
            })

        },
        toPaymentPage() {
            const url = `http://localhost:8081/transaction?orderid=${this.responseData.orderid}&callback_url=http://localhost:8080/invokesc`
            window.open(url, '_blank')
        }
    }
}
</script>
