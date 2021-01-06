import compile, { OPTIONS } from '../compile';
import * as __langs__ from './langs';

function nodeCompile(content = '', optionsStart = OPTIONS) {
    return compile(content, { ...optionsStart, __langs__ });
}

export default nodeCompile;
