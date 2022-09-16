import { useEffect, useState, useMemo } from 'react';
import Button from '@/components/ui/button';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { coinList } from '@/data/static/coin-list';

const sort1 = [
    { id: 1, name: 'All Types' },
    { id: 2, name: 'Limit' },
    { id: 3, name: 'Stop-Limit' },
];
function SortList() {
    const [selectedItem, setSelectedItem] = useState(sort1[0]);

    return (
        <div className="relative w-full">
            <Listbox value={selectedItem} onChange={setSelectedItem}>
                <Listbox.Button className=" flex h-full items-center rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-[#161b1d] dark:text-white">
                    <div className="mr-2">{selectedItem.name}</div>
                    <ChevronDown />
                </Listbox.Button>
                <Transition
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 -translate-y-0"
                    leaveTo="opacity-0 translate-y-2"
                >
                    <Listbox.Options className="absolute w-[120px] left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-large dark:bg-[#303030]">
                        {sort1.map((item) => (
                            <Listbox.Option key={item.id} value={item}>
                                {({ selected }) => (
                                    <div
                                        className={`block cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white  ${selected
                                            ? 'my-1 bg-gray-100 dark:bg-gray-600'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {item.name}
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    );
}

const sort2 = [
    { id: 1, name: 'All Statuses' },
    { id: 2, name: 'Open' },
    { id: 3, name: 'Expired' },
    { id: 4, name: 'Failed' },
];
function SortList2() {
    const [selectedItem, setSelectedItem] = useState(sort2[0]);

    return (
        <div className="relative w-full">
            <Listbox value={selectedItem} onChange={setSelectedItem}>
                <Listbox.Button className=" flex h-full items-center rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-[#161b1d] dark:text-white">
                    <div className="mr-2">{selectedItem.name}</div>
                    <ChevronDown />
                </Listbox.Button>
                <Transition
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 -translate-y-0"
                    leaveTo="opacity-0 translate-y-2"
                >
                    <Listbox.Options className="absolute w-[120px] left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-large dark:bg-[#303030]">
                        {sort2.map((item) => (
                            <Listbox.Option key={item.id} value={item}>
                                {({ selected }) => (
                                    <div
                                        className={`block cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white  ${selected
                                            ? 'my-1 bg-gray-100 dark:bg-gray-600'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {item.name}
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    );
}

export default function Orders({ ...props }) {
    return (
        <>
            <div className="mt-6 w-full shrink">
                <div className="mt-1 w-full shrink lg:flex lg:flex-row lg:justify-between">
                    <div className="flex max-w-[40%] shrink flex-row px-4">
                        <Button
                            size="mini"
                            color="primary"
                            shape="rounded"
                            variant="transparent"
                            className="text-sm xs:tracking-widest"
                        >
                            Active Orders
                        </Button>
                        <Button
                            size="mini"
                            color="gray"
                            shape="rounded"
                            variant="ghost"
                            className="mx-1 text-sm xs:tracking-widest"
                        >
                            Order History
                        </Button>
                    </div>
                    <div className="flex shrink flex-row items-center px-4">
                        <div className=" flex flex-row items-center">
                            <SortList />
                        </div>
                        <div className="mx-5 flex flex-row items-center">
                            <SortList2 />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 h-[200px] max-h-[220px] w-full px-8">
                <Scrollbar style={{ height: 'calc(100% - 32px)' }}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Token Pair</th>
                                <th>Amount</th>
                                <th>Limit Price</th>
                                <th>Filled Price</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th style={{ textAlign: 'right' }}>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {true ? <></> : <>
                                <tr>
                                    <td style={{ textAlign: 'left' }}>{coinList[0].code} / {coinList[1].code}</td>
                                    <td>1.3 {coinList[0].code}</td>
                                    <td>1580</td>
                                    <td>1588</td>
                                    <td>completed</td>
                                    <td>2022-9-3 1:27:46</td>
                                    <td style={{ textAlign: 'right' }}>0.0014 {coinList[0].code}</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left' }}>{coinList[0].code} / {coinList[1].code}</td>
                                    <td>1.5 {coinList[0].code}</td>
                                    <td>1580</td>
                                    <td></td>
                                    <td>pending</td>
                                    <td>2022-9-3 1:27:46</td>
                                    <td style={{ textAlign: 'right' }}>0.0014 {coinList[0].code}</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left' }}>{coinList[0].code} / {coinList[1].code}</td>
                                    <td>1.4 {coinList[0].code}</td>
                                    <td>1580</td>
                                    <td></td>
                                    <td>pending</td>
                                    <td>2022-9-3 1:27:46</td>
                                    <td style={{ textAlign: 'right' }}>0.0014 {coinList[0].code}</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left' }}>{coinList[0].code} / {coinList[1].code}</td>
                                    <td>1.4 {coinList[0].code}</td>
                                    <td>1580</td>
                                    <td></td>
                                    <td>pending</td>
                                    <td>2022-9-3 1:27:46</td>
                                    <td style={{ textAlign: 'right' }}>0.0014 {coinList[0].code}</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left' }}>{coinList[0].code} / {coinList[1].code}</td>
                                    <td>1.4 {coinList[0].code}</td>
                                    <td>1580</td>
                                    <td></td>
                                    <td>pending</td>
                                    <td>2022-9-3 1:27:46</td>
                                    <td style={{ textAlign: 'right' }}>0.0014 {coinList[0].code}</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left' }}>{coinList[0].code} / {coinList[1].code}</td>
                                    <td>1.4 {coinList[0].code}</td>
                                    <td>1580</td>
                                    <td></td>
                                    <td>pending</td>
                                    <td>2022-9-3 1:27:46</td>
                                    <td style={{ textAlign: 'right' }}>0.0014 {coinList[0].code}</td>
                                </tr>
                            </>}
                        </tbody>
                    </table>
                </Scrollbar>
            </div>
        </>
    );
}
