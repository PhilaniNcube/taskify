/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HTLzuGlj7IH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import {type JSX, type SVGProps, useState, useTransition,  } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileIcon, TrashIcon, UploadIcon } from "lucide-react";
import SubmitButton from "@/components/submit-button";
import { uploadFile } from "@/actions/upload-file";

export default function UploadDocuments({projectId}:{projectId:string}) {

  const [files, setFiles] = useState<File[]>([]);

  const [pending, startTransition] = useTransition();

	return (
		<div className="w-full p-6 rounded-lg shadow-md bg-slate-100 dark:bg-gray-900">
			<div className="mb-6">
				<h2 className="mb-2 text-2xl font-bold">Upload Documents</h2>
				<p className="text-gray-500 dark:text-gray-400">Click to select.</p>
			</div>
			<div
				// onDragOver={(event) => event.preventDefault()}
				// onDrop={handleDrop}
				className="flex flex-col items-center justify-center p-3 mb-6 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
			>
				<form
					className="flex items-center justify-between w-full gap-x-3"
					action={async (formData:FormData) => {
						startTransition(() => {
               uploadFile(formData);
            });
					}}
				>
					<Input type="hidden" name="projectId" value={projectId} />
					<Input
						id="file-upload"
						name="file"
						type="file"
						className=""
            disabled={pending}
            aria-disabled={pending}
						// onChange={handleFileSelect}
					/>
					<SubmitButton>
						<UploadIcon className="w-6 h-6" />
					</SubmitButton>
				</form>
			</div>
			{files.length > 0 && (
				<div className="mb-6">
					<h3 className="mb-4 text-lg font-bold">Uploaded Files</h3>
					<ul className="space-y-4">
						{files.map((file, index) => (
							<li
								key={file.size}
								className="flex items-center justify-between p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
							>
								<div className="flex items-center gap-4">
									<FileIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
									<div>
										<p className="font-medium">{file.name}</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{file.size > 1024 * 1024
												? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
												: `${(file.size / 1024).toFixed(2)} KB`}
										</p>
									</div>
								</div>
								<Button
									variant="ghost"
									size="icon"
									// onClick={() => handleDelete(index)}
								>
									<TrashIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
								</Button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
