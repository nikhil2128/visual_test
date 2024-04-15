import { Base } from '../../../shared/entities/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class Message extends Base {
  @Index()
  @Column()
  userId: string;

  @Column()
  content: string;
}
