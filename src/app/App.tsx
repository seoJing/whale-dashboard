import { Providers } from './providers';
import { SidebarPage } from '@pages/sidebar';
import '@app/styles/index.css';

export function App() {
    return (
        <Providers>
            <SidebarPage />
        </Providers>
    );
}
