import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../common/state/store';
import { WorkerData, setWorkers } from '../../common/state/workersSlice';
import { fetchWorkersData } from '../../common/gateway/gateway';
import Worker from './worker/Worker';
import YearsBlock from './yearsBlock/YearsBlock';
import NotFoundBlock from './notFoundBlock/NotFoundBlock';
import ErrorPage from './errorPage/ErrorPage';
import Skeleton from './skeleton/Skeleton';

import './listOfWorkers.scss';

interface ListOfWorkersProps {
    activeFilter: 'alphabet' | 'birthday';
    searchQuery: string;
}

const ListOfWorkers: React.FC<ListOfWorkersProps> = ({ activeFilter, searchQuery }) => {
    const dispatch = useDispatch();
    const workers = useSelector((state: RootState) => state.workers.workers);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data: WorkerData[] = await fetchWorkersData();
                dispatch(setWorkers(data));
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, [dispatch]);

    if (loading) {
        return (
            <div>
                <Skeleton  />
            </div>
        );
    }

    if (error) {
        return <ErrorPage />;
    }

    const filteredWorkers = workers.filter(worker => {
        const searchQueryLower = searchQuery.toLowerCase();
        return (
            worker.name.toLowerCase().includes(searchQueryLower) ||
            worker.tag.toLowerCase().includes(searchQueryLower) ||
            worker.email.toLowerCase().includes(searchQueryLower)
        );
    });

    const sortedWorkers = [...filteredWorkers].sort((a, b) => {
        if (activeFilter === 'alphabet') {
            return a.name.localeCompare(b.name);
        } else if (activeFilter === 'birthday') {
            return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
        }
        return 0;
    });

    const workerGroupsByYear: { [key: number]: WorkerData[] } = {};
    if (activeFilter === 'birthday') {
        for (const worker of sortedWorkers) {
            const year = new Date(worker.birthDate).getFullYear();
            if (!workerGroupsByYear[year]) {
                workerGroupsByYear[year] = [];
            }
            workerGroupsByYear[year].push(worker);
        }
    }

    const noWorkersFound = filteredWorkers.length === 0;

    return (
        <ul className="listOfWorkers">
            {noWorkersFound ? (
                <NotFoundBlock />
            ) : (
                <>
                    {activeFilter === 'birthday' &&
                        Object.keys(workerGroupsByYear).map(yearString => {
                            const year = Number(yearString);
                            return (
                                <React.Fragment key={year}>
                                    <YearsBlock year={year} />
                                    {workerGroupsByYear[year].map((worker: WorkerData) => (
                                        <Worker key={worker.id} worker={worker} showBirthDate={true} />
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    {activeFilter === 'alphabet' &&
                        sortedWorkers.map((worker: WorkerData) => (
                            <Worker key={worker.id} worker={worker} showBirthDate={false} />
                        ))}
                </>
            )}
        </ul>
    );
};

export default ListOfWorkers;
