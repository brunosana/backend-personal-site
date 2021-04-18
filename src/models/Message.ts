import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    message: string;
}

export default Message;
