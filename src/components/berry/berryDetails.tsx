import { getBerryData } from '@/utils/api';
import React from 'react';

type Props = Awaited<ReturnType<typeof getBerryData>>;

const BerryDetails: React.FC<Props> = ({ berryItem, berryDetails }) => {
  return (
    <div className="w-full">
      <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
        <i className="text-slate-500">#{berryDetails.id}</i>
        <span>{berryDetails.item.name}</span>
        <div className="rounded-full bg-slate-300 px-3 py-2 text-xs text-black">
          {berryItem.category.name}
        </div>
      </div>
      <div className="text-gray-500">
        {berryItem.effect_entries.map((entry) => (
          <div key={entry.effect}>{entry.effect}</div>
        ))}
      </div>
      <table className="w-full border-none">
        <tbody>
          <tr>
            <td>size:</td>
            <td>{berryDetails.size / 10}cm</td>
          </tr>
          <tr>
            <td>cost:</td>
            <td>{berryItem.cost}</td>
          </tr>
          <tr>
            <td>firmness:</td>
            <td>{berryDetails.firmness.name}</td>
          </tr>
          <tr>
            <td>growth time:</td>
            <td>{berryDetails.growth_time}</td>
          </tr>
          <tr>
            <td>max harvest:</td>
            <td>{berryDetails.max_harvest}</td>
          </tr>
          <tr>
            <td>attributes:</td>
            <td className="flex flex-wrap">
              {berryItem.attributes.map((attr, index) => {
                return index === 0 ? (
                  <div key={attr.name}>{attr.name}</div>
                ) : (
                  <div key={attr.name} className="flex gap-1">
                    <span>•</span> {attr.name}
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="my-3 text-2xl">Flavors</h2>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr>
            <td className="border-2 border-sky-700 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
              flavor
            </td>
            <td className="border-2 border-sky-700 bg-sky-300 dark:border-sky-300 dark:bg-sky-800">
              potency
            </td>
          </tr>
        </thead>
        <tbody>
          {berryDetails.flavors.map((flavor) => (
            <tr key={flavor.flavor.name}>
              <td className="border-2 border-slate-400 dark:border-slate-700">
                {flavor.flavor.name}
              </td>
              <td className="border-2 border-slate-400 dark:border-slate-700">
                {flavor.potency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BerryDetails;
