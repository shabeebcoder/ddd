import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SHA256 } from 'crypto-js';

@Injectable()
export class PhonePayService {
  baseUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox';
  endPoints = '/pg/v1/pay';
  saltKey = '96434309-7796-489d-8924-ab56988a6076';
  saltIndex = 1;
  merchantId = 'PGTESTPAYUAT86';
  merchantTransactionId = 'MT7850590068188104';
  merchantUserId = 'MUID123';
  amount = 10000;
  redirectUrl = 'https://webhook.site/redirect-url';
  redirectMod = 'REDIRECT';
  callbackUrl = 'https://webhook.site/callback-url';
  mobileNumber = '+919633628548';
  paymentInstrument = {
    type: 'PAY_PAGE',
  };

  constructor() {}

  async intiatePayment() {
    // Generate a unique merchant transaction ID for each transaction
    const merchantTransactionId = uuidv4();

    // redirect url => phonePe will redirect the user to this url once payment is completed. It will be a GET request, since redirectMode is "REDIRECT"
    const normalPayLoad = {
      merchantId: this.merchantId, //* PHONEPE_MERCHANT_ID . Unique for each account (private)
      merchantTransactionId: merchantTransactionId,
      merchantUserId: 'MUID123',
      amount: 3000, // converting to paise
      redirectUrl: `${'http://localhost:3000'}/payment/validate/${merchantTransactionId}`,
      redirectMode: 'REDIRECT',
      mobileNumber: '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    // make base64 encoded payload
    const bufferObj = Buffer.from(JSON.stringify(normalPayLoad), 'utf8');
    const base64EncodedPayload = bufferObj.toString('base64');

    // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
    const string = base64EncodedPayload + '/pg/v1/pay' + this.saltKey;
    const sha256_val = SHA256(string);
    const xVerifyChecksum = sha256_val + '###' + this.saltIndex;
    try {
      const response = await axios.post(
        `${this.baseUrl}/pg/v1/pay`,
        {
          request: base64EncodedPayload,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xVerifyChecksum,
            accept: 'application/json',
          },
        },
      );
      console.log(response.data);
      return {
        ...response.data,
        redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
      };
    } catch (e) {
      return e;
    }
  }

  async validatePayment(merchantTransactionId: string) {
    // check the status of the payment using merchantTransactionId

    const statusUrl =
      `${this.baseUrl}/pg/v1/status/${this.merchantId}/` +
      merchantTransactionId;

    // generate X-VERIFY
    const string =
      `/pg/v1/status/${this.merchantId}/` +
      merchantTransactionId +
      this.saltKey;
    const sha256_val = SHA256(string);
    const xVerifyChecksum = sha256_val + '###' + this.saltIndex;

    try {
      const response = await axios.get(statusUrl, {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerifyChecksum,
          'X-MERCHANT-ID': merchantTransactionId,
          accept: 'application/json',
        },
      });
      return response.data;
    } catch (e) {
      return e;
    }
  }
}
