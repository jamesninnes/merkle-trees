import MerkleNode from "./MerkleNode";
import { getHash } from './util/getHash'
import { makeRoot } from "./util/makeRoot";

class MerkleTree {
    private root: MerkleNode;
    private height: number;

    constructor(arr: string[]) {
        if (arr.length === 0) throw Error("Array length must be greater than 0")

        this.height = Math.ceil(Math.log2(arr.length)) + 1;
        this.root = makeRoot(
            arr.map((str) => new MerkleNode(getHash(str)))
        );
    }

    /**
     * 
     * @returns Merkle root of the tree
     */
    getRoot() {
        return this.root
    }

    /**
     * 
     * @returns Number of levels in the tree
     */
    getHeight() {
        return this.height
    }

    /**
     * 
     * @param index number
     * @param node MerkleNode
     * @returns Array of hashes at the given level
     * @complexity Time O(log n)
     * 
     * This function could have improved space complexity by not using the nodes.concat method, 
     * as this creates another instance of tha array rather than manipulating the original
     */
    getLevel(index: number, node: MerkleNode = this.root): string[] {
        let nodes: string[] = []
        if (index === 0) {
            nodes.push(node.value)
            return nodes
        }
        if (node.left) {
            nodes = nodes.concat(this.getLevel(index - 1, node.left))
        }
        if (node.right) {
            nodes = nodes.concat(this.getLevel(index - 1, node.right))
        }
        return nodes
    }
}

export default MerkleTree;
