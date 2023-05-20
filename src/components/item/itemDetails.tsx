import { getItemData } from '@/utils/api';
import React from 'react';

type Props = Awaited<ReturnType<typeof getItemData>>;

const ItemDetails: React.FC<Props> = ({ itemDetails }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Tite bar */}
      <div className="mb-2 flex gap-2 border-b-4 border-black pb-2 text-2xl font-bold dark:border-white">
        <i className="text-slate-500">#{itemDetails.id}</i>
        <span>{itemDetails.name}</span>
        <div className="rounded-md bg-green-200 px-3 py-2 text-xs text-black">
          {itemDetails.category.name}
        </div>
      </div>

      {/* Details */}
      <div className="text-gray-500">
        {itemDetails.effect_entries.map((entry) => (
          <div key={entry.effect}>{entry.effect}</div>
        ))}
      </div>

      {/* item data */}
      <table>
        <tbody className="[&>*>*]:px-2 [&>*>*]:py-2">
          <tr>
            <td>names:</td>
            <td className="flex flex-wrap gap-2">
              {itemDetails.names.map((name) => (
                <div
                  key={name.language.name + name.name}
                  className="flex w-fit gap-1 rounded-md bg-sky-200 px-2 py-1 text-xs text-black"
                >
                  <span>{name.language.name}</span>
                  <span>/</span>
                  <span>{name.name}</span>
                </div>
              ))}
            </td>
          </tr>

          <tr>
            <td>cost:</td>
            <td>
              <span className="w-fit rounded-md bg-amber-300 px-2 py-1 text-xs text-black">
                {itemDetails.cost}
              </span>
            </td>
          </tr>

          <tr>
            <td>attributes:</td>
            <td className="flex flex-wrap gap-2">
              {itemDetails.attributes.map((attr) => (
                <span
                  key={attr.name}
                  className="w-fit rounded-md bg-orange-300 px-2 py-1 text-xs text-black"
                >
                  {attr.name}
                </span>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ItemDetails;
