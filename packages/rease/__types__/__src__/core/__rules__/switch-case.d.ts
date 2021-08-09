import { ReaseRule } from '..';
import { TypeStore, TypeService, TypeRNode, TypeProps } from '..';
export declare class RuleSwitch extends ReaseRule {
    _rule: any;
    $rule: TypeStore<any>;
    __(_serviceRease: TypeService, _thisRNode: TypeRNode, _props: TypeProps): void;
}
export declare class RuleCase extends ReaseRule {
    _rule: any;
    $rule: TypeStore<any>;
    __(_serviceRease: TypeService, _thisRNode: TypeRNode, _props: TypeProps): void;
}
