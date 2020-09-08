import { CardItem } from "@sdk/cards/card-item.model";

export function CardItemComponent({ item }: { item: CardItem }) {
    return (
        <span>
            {item.type}
        </span>
    );
}