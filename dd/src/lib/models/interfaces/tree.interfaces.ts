import {Observable} from "rxjs";
import {CheckboxState} from "../enums/checkbox-state.enum";

export interface TreeNode<T = any> {
    parent?: TreeNode<T> | null;
    children: T[];
    level: number;
    label: string;
    id: string;
}

export interface RawTree<T extends TreeNode> extends TreeNode {
    parent?: TreeNode<T> | null;
    children: T[];
    search?: CustomSearch<string, T>
}

export interface SelectTree extends RawTree<SelectNode> {
    collapsible: boolean;
    checked: CheckboxState
}

export interface SelectNode extends TreeNode<SelectNode> {
    collapsible: boolean;
    collapsed: boolean;
    checked: CheckboxState
}

// We want enable custom search logic (different implementations)
export interface CustomSearch<T = string, N = TreeNode> {
    search(txt: T): Observable<N>
}

