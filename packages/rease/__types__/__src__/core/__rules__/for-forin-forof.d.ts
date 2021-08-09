import { ReaseRule } from '..';
import { TypeStore, TypeServiceRease, TypeRNode, TypeProps } from '..';
export declare class RuleFor extends ReaseRule {
    _rule: boolean;
    $rule: TypeStore<boolean>;
    __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode, _props: TypeProps): void;
}
export declare class RuleForIn extends ReaseRule {
    _rule: boolean;
    $rule: TypeStore<boolean>;
    __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode, _props: TypeProps): void;
}
export declare class RuleForOf extends ReaseRule {
    _rule: boolean;
    $rule: TypeStore<boolean>;
    __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode, _props: TypeProps): void;
}
