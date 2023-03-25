import { Policy, useGrantedPolicies } from '@abpreact/hooks';
import { v4 } from 'uuid';
import {
    AdjustmentsHorizontalIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/solid';
import { Button } from '../Shared/Button';
type PermissionActionsProps = {
    actions: Array<{
        icon: 'permission' | 'trash' | 'pencil';
        callback: () => void;
        policy: Policy;
        visible?: boolean;
    }>;
};
export const PermissionActions = ({ actions }: PermissionActionsProps) => {
    const { can } = useGrantedPolicies();
    const renderElement = (action: (typeof actions)[0]) => {
        if (!can(action.policy) || action.visible) return false;
        const variant = action.icon === 'trash' ? 'destructive' : 'subtle';
        return (
            <Button key={v4()} variant={variant} onClick={action.callback}>
                {action.icon === 'permission' && (
                    <AdjustmentsHorizontalIcon
                        width={15}
                        height={15}
                        className="text-white"
                    />
                )}
                {action.icon === 'trash' && (
                    <TrashIcon width={15} height={15} className="text-white" />
                )}
                {action.icon === 'pencil' && (
                    <PencilIcon width={15} height={15} className="text-white" />
                )}
            </Button>
        );
    };
    return (
        <section className="flex items-center space-x-2">
            {actions.map(renderElement)}
        </section>
    );
};
