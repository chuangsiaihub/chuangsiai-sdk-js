
import { ChuangsiaiClient } from 'chuangsiai-sdk';
// const { ChuangsiaiClient } = require('chuangsiai-sdk');

const client = new ChuangsiaiClient({ accessKey: 'accessKey', secretKey: 'secretKey' });
client.inputGuardrail({ strategyId: 'strategyId', content: '检测文本内容' }).then(console.log).catch(console.error);