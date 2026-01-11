import { Providers } from './providers';
import { DashboardLayout } from '../layouts';
import './styles/index.css';

export function App() {
    return (
        <Providers>
            <DashboardLayout />
        </Providers>
    );
}
