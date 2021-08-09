import { ReaseRule } from '..';
import { TypeStore, TypeServiceRease, TypeRNode, TypeProps } from '..';
export declare class RuleIf extends ReaseRule {
    _rule: boolean;
    $rule: TypeStore<boolean>;
    __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode, _props: TypeProps): void;
}
export declare class RuleElseIf extends ReaseRule {
    _rule: boolean | null;
    $rule: TypeStore<boolean | null>;
    __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode, _props: TypeProps): void;
}
export declare class RuleElse extends ReaseRule {
    __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode): void;
}
