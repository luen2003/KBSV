import { useEffect, useState } from "react";

import { Tab } from "@headlessui/react";
import { type Data } from "@types";
import clsx from "clsx";

export default function TransactionTabs({ tabs }: { tabs: Data.ItemTab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    if (!tabs.find((i) => i.key === activeTab.key)) {
      setActiveTab(tabs[0]);
    }
  }, [activeTab.key, tabs]);

  return (
    <Tab.Group
      as={"div"}
      className="h-full flex-col flex bg-gray-002 rounded-t-lg mt-1"
      selectedIndex={activeTab.key}
      onChange={(i) => setActiveTab(tabs[i])}
    >
      <Tab.List>
        {tabs.map((itemTab) => (
          <Tab key={itemTab.id} className="outline-none">
            {({ selected }) => (
              <div
                className={clsx(
                  "h-[68px] flex items-center justify-center flex-col relative px-4",
                  selected &&
                    "bg-gradient-to-t from-color-primary/10 to-color-primary/0"
                )}
              >
                {itemTab.renderTitle}
                {selected && (
                  <div className="w-full h-1 bg-color-primary absolute bottom-0 left-0" />
                )}
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="h-full flex-1 outline-none overflow-hidden">
        {tabs.map((itemTab) => (
          <Tab.Panel
            className="outline-none flex flex-col flex-1 h-full overflow-hidden"
            key={itemTab.id}
          >
            {itemTab.renderContent}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
