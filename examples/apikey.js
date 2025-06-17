import { ChuangsiaiClient } from '../dist/index.js';

const client = new ChuangsiaiClient({ apiKey: '<apiKey>' });

client
    .inputGuardrail({ strategyKey: '<strategyKey>', content: '检测文本内容' })
    .then((res) => {
        console.log(res)
    })
    .catch(console.error);
