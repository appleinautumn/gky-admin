import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateLiveDto {
  @IsNotEmpty({ message: 'ku1live is required' })
  @IsUrl(
    {
      require_tld: false,
      require_protocol: true,
      protocols: ['http', 'https', 'rtmp', 'rtsp'],
    },
    { message: 'ku1live must be a valid URL (http, https, rtmp, rtsp)' },
  )
  ku1live: string;

  @IsNotEmpty({ message: 'ku2live is required' })
  @IsUrl(
    {
      require_tld: false,
      require_protocol: true,
      protocols: ['http', 'https', 'rtmp', 'rtsp'],
    },
    { message: 'ku2live must be a valid URL (http, https, rtmp, rtsp)' },
  )
  ku2live: string;

  @IsNotEmpty({ message: 'ku5live is required' })
  @IsUrl(
    {
      require_tld: false,
      require_protocol: true,
      protocols: ['http', 'https', 'rtmp', 'rtsp'],
    },
    { message: 'ku5live must be a valid URL (http, https, rtmp, rtsp)' },
  )
  ku5live: string;
}
