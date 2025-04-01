import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'links',
  timestamps: true, // to handle `created_at` and `updated_at`
})
export class Links extends Model<Links> {
  @Column(DataType.STRING)
  ku1live: string;

  @Column(DataType.STRING)
  ku2live: string;

  @Column(DataType.STRING)
  ku5live: string;

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
