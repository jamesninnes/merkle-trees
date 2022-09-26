import MerkleNode from "../MerkleNode";
import { getHash } from "./getHash";

/**
 * 
 * @param arr Array of Merkle Nodes
 * @returns Root MerkleNode
 */
export const makeRoot = (arr: MerkleNode[]): MerkleNode => {
    if (arr.length === 1) return arr[0];

    const list: MerkleNode[] = [];
    for (let i = 0; i < arr.length; i += 2) {
        const currentItem = arr[i];
        if (i + 1 >= arr.length) {
            list.push(currentItem);
            break;
        }
        const nextItem = arr[i + 1];
        let value = currentItem.value + nextItem.value;
        const node = new MerkleNode(getHash(value), currentItem, nextItem);
        list.push(node);
    }
    return makeRoot(list);
};