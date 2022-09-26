import MerkleTree from "./MerkleTree";
import { getHash } from "./util/getHash";

describe('merkle tree', () => {
    const tier1 = new MerkleTree(["L1"])
    const tier2 = new MerkleTree(["L1", "L2"])
    const tier8 = new MerkleTree(["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"])

    describe('root', () => {
        it('is correct with 1 input', () => {
            const merkleTree = tier1

            expect(merkleTree.getRoot().value).toEqual(getHash("L1"))
        })

        it('is correct with 2 inputs', () => {
            const merkleTree = tier2

            expect(merkleTree.getRoot().value).toEqual(getHash(getHash("L1") + getHash("L2")))
        })
    })

    describe('height', () => {
        it('is correct with 1 inputs', () => {
            const merkleTree = tier1

            expect(merkleTree.getHeight()).toEqual(1)
        })

        it('is correct with 2 inputs', () => {
            const merkleTree = tier2

            expect(merkleTree.getHeight()).toEqual(2)
        })

        it('is correct with 3 inputs', () => {
            const merkleTree = new MerkleTree(["L1", "L2", "L3"])

            expect(merkleTree.getHeight()).toEqual(3)
        })

        it('is correct with 4 inputs', () => {
            const merkleTree = new MerkleTree(["L1", "L2", "L3", "L4"])

            expect(merkleTree.getHeight()).toEqual(3)
        })

        it('is correct with 5 inputs', () => {
            const merkleTree = new MerkleTree(["L1", "L2", "L3", "L4", "L5"])

            expect(merkleTree.getHeight()).toEqual(4)
        })

        it('is correct with 6 inputs', () => {
            const merkleTree = new MerkleTree(["L1", "L2", "L3", "L4", "L5", "L6"])

            expect(merkleTree.getHeight()).toEqual(4)
        })

        it('is correct with 7 inputs', () => {
            const merkleTree = new MerkleTree(["L1", "L2", "L3", "L4", "L5", "L6", "L7"])

            expect(merkleTree.getHeight()).toEqual(4)
        })

        it('is correct with 8 inputs', () => {
            const merkleTree = tier8

            expect(merkleTree.getHeight()).toEqual(4)
        })
    });

    describe('level', () => {
        it('gets level 0 correctly', () => {
            expect(tier8.getLevel(0)).toEqual([tier8.getRoot().value])
        })

        it('gets level 1 correctly', () => {
            expect(tier8.getLevel(1)).toEqual([
                "63442ffc2d48a92c8ba746659331f273748ccede648b27f4eacf00cb0786c439",
                "28cf3797c5e00630387c905991cacf37805df1c524cb32559edd0fb15f2e1638"])
        })

        it('gets level 2 correctly', () => {
            expect(tier8.getLevel(2)).toEqual([
                "f2b92f33b56466fce14bc2ccf6a92f6edfcd8111446644c20221d6ae831dd67c",
                "8f75b0c1b3d1c0bb2eda264a43f8fdc5c72c853c95fbf2b01c1d5a3e12c6fe9a",
                "065ad75989d1e0b13a72e00a36f269df9e03dc03b1c039702dfee53cad762035",
                "f7a9685b3ad1df6480a187be1524b9d9bd99ee5b2339b54e5c4de41ed5b64d60"]
            )
        })

        it('get level 3 correctly', () => {
            expect(tier8.getLevel(3)).toEqual([
                "dffe8596427fc50e8f64654a609af134d45552f18bbecef90b31135a9e7acaa0",
                "d76354d8457898445bb69e0dc0dc95fb74cc3cf334f8c1859162a16ad0041f8d",
                "842983de8fb1d277a3fad5c8295c7a14317c458718a10c5a35b23e7f992a5c80",
                "4a5a97c6433c4c062457e9335709d57493e75527809d8a9586c141e591ac9f2c",
                "b5bdca718ffd3f26e43ed3a3e104301ebc70d8a2f3a71f46fafb8f6f6d6ae947",
                "c285b3cc20089aab036290e624d06475ae6deecbc2f0090707d9bf7cb7b66b7e",
                "a188ee292cd1d6c1f05903849befbd1206362c100705166002b6447c2302f8c2",
                "63174ecb58f262e8d0eb62348b79df1ae79c31c14586e1feb47181fec25b710f"])
        })
    })
})