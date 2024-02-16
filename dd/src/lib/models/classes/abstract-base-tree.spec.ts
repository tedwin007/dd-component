import {AbstractBaseTree, nodeMap} from "./abstract-base-tree.class";
import {MockNode, MockTree, selectTree} from "../tests/mocks";

describe('AbstractBaseTree', () => {
    let tree: AbstractBaseTree<any, any>
    let createNodeSpy: jasmine.Spy
    beforeEach(() => {


        tree = new MockTree(selectTree.label, selectTree.id, selectTree.children);
    })

    describe('instantiate', () => {
        it('tree should be created', () => {
            expect(tree).toBeDefined();
        })

        it('should instantiate with the right data', () => {
            expect(tree.id).toEqual(selectTree.id)
            expect(tree.label).toEqual(selectTree.label)
            expect(tree.children.length).toEqual(selectTree.children.length)
        })

        it('should instantiate children (Nodes)', () => {
            expect(tree.id).toEqual(selectTree.id)
            expect(tree.label).toEqual(selectTree.label)
            expect(tree.children.every((item => item instanceof MockNode))).toEqual(true);
        })

        it('should "map" parents nodes in a map', () => {
            expect(Array.from(nodeMap.keys())).toEqual(["0.1.1",'0.1','0.2.1.1','0.2.1.2','0.2.2','0.2.1','0.2'])
        })

        // todo: configuration issues (it's still a home assigment. decided not to do)
        // xdescribe('createNode method', () => {
        //     it('should call createNode method on initialization', () => {
        //         createNodeSpy = createSpy('createNode', tree.createNode)
        //         expect(createNodeSpy).toHaveBeenCalled()
        //     })
        //
        //     it('should return `<TreeNode>` from createNode method', () => {
        //         createNodeSpy.and.callThrough()
        //         expect(createNodeSpy(selectTree.children[0])).toBeInstanceOf(MockNode)
        //     })
        // })

    })
})